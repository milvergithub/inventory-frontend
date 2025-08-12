import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table.tsx";
import {type ReactElement, type ReactNode, useEffect, useState} from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Sort } from "@/enums/sort.ts";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils.ts";
import { Icon } from "@/components/ui/icon.tsx";
import type { CheckedState } from "@radix-ui/react-checkbox";
import {Checkbox} from "@/components/ui/checkbox.tsx";

type ColumnClassNames = {
	header: string;
	cell: string;
};

export type Column<T> = {
	sortKey?: string;
	header: string;
	cell: (item: T, index: number) => ReactElement | string | number | null | undefined;
	className?: Partial<ColumnClassNames>;
	onSort?: (sort: Sort) => void;
	hidden?: boolean;
};

type DataTableSort = {
	key: string;
	order: Sort;
};

type DataTableSelection<T> = {
	onChange: (selectedItems: T[]) => void;
	items: T[];
	key: keyof T;
	disabled?: (item: T) => boolean;
};

type ClassNames = {
	table: string;
	row: string;
};

export type RowClassNames = {
	[index: number]: string;
};

type Props<T> = {
	columns: Column<T>[];
	items?: T[];
	onReachEnd?: () => void;
	onRowClick?: (item: T, index: number) => void;
	sort?: DataTableSort;
	selection?: DataTableSelection<T>;
	itemKey?: keyof T;
	emptyState?: ReactNode;
	className?: Partial<ClassNames>;
	highlight?: (item: T) => boolean;
	classNames?: RowClassNames;
};

export default function DataTable<T>({
										 columns,
										 items,
										 onReachEnd,
										 onRowClick,
										 sort,
										 selection,
										 itemKey,
										 emptyState,
										 className,
										 highlight,
										 classNames,
									 }: Props<T>) {
	const [headCheckedState, setHeadCheckedState] = useState<CheckedState>();
	const { ref, inView } = useInView();

	const colSpan = columns.length + (selection ? 1 : 0);

	function getSortMatch(column: Column<T>) {
		return column.sortKey ?? column.header;
	}

	function handleSort(column: Column<T>) {
		if (column.onSort) {
			const sortMatch = getSortMatch(column);
			const sortOrder =
				sortMatch.toLowerCase() === sort?.key?.toLowerCase() && sort.order === Sort.Asc
					? Sort.Desc
					: Sort.Asc;
			column.onSort?.(sortOrder);
		}
	}

	function handleHeadCheck() {
		if (!selection) {
			return;
		} else if (items && selection.items.length === 0) {
			if (selection.disabled) {
				selection.onChange?.(items.filter((val) => !selection.disabled?.(val)));
			} else {
				selection.onChange?.(items);
			}
		} else {
			selection.onChange?.([]);
		}
	}

	function handleItemCheck(checked: CheckedState, item: T) {
		if (selection) {
			if (checked === true) {
				selection.onChange?.([...selection.items, item]);
			} else {
				selection.onChange?.(
					selection.items.filter((val) => val[selection.key] !== item[selection.key]),
				);
			}
		}
	}

	useEffect(() => {
		if (selection) {
			if (selection.items.length === 0) {
				setHeadCheckedState(false);
			} else if (selection.items.length === items?.length) {
				setHeadCheckedState(true);
			} else {
				setHeadCheckedState("indeterminate");
			}
			selection.onChange?.(selection.items);
		}
	}, [selection?.items, items]);

	useEffect(() => {
		if (inView && onReachEnd) {
			onReachEnd();
		}
	}, [inView]);

	const checkboxEnabled = () => {
		if (!items) {
			return false;
		}

		if (!selection?.disabled) {
			return true;
		}

		return items.some((val) => !selection.disabled?.(val));
	};

	return (
		<Table className={cn(items && items.length > 0 && "divide-y", className?.table)}>
			<TableHeader className="sticky top-0 z-10">
				<TableRow>
					{selection && items && items.length > 0 && (
						<TableHead>
							<Checkbox
								name="box"
								tabIndex={-1}
								checked={headCheckedState}
								onCheckedChange={handleHeadCheck}
								disabled={!checkboxEnabled()}
							/>
						</TableHead>
					)}
					{columns.map(
						(column, index) =>
							!column.hidden && (
								<TableHead
									key={index}
									className={cn(column.onSort && "cursor-pointer", column.className?.header)}
									onClick={(evt) => {
										evt.preventDefault();
										handleSort(column);
									}}
								>
									<div className="flex flex-row items-center gap-2">
										{column.header}
										{sort &&
											getSortMatch(column).toLowerCase() === sort.key.toLowerCase() &&
											(sort.order === Sort.Asc ? (
												<Icon icon={ChevronUp} className="w-4" />
											) : (
												<Icon icon={ChevronDown} className="w-4" />
											))}
									</div>
								</TableHead>
							),
					)}
				</TableRow>
			</TableHeader>
			<TableBody>
				{!items ? (
					<></>
				) : items.length === 0 ? (
					<TableRow>
						<TableCell colSpan={colSpan} className="p-0">
							{emptyState}
						</TableCell>
					</TableRow>
				) : (
					items.map((item, index) => (
						<DataTableRow<T>
							key={itemKey ? String(item[itemKey]) : index}
							item={item}
							index={index}
							colSpan={colSpan}
							inViewRef={index === items.length - 1 ? ref : undefined}
							onRowClick={onRowClick}
							handleItemCheck={handleItemCheck}
							selection={selection}
							columns={columns}
							className={className?.row}
							highlight={highlight}
							classNames={classNames}
						/>
					))
				)}
			</TableBody>
		</Table>
	);
}

type DataTableRowProps<T> = {
	item: T;
	index: number;
	colSpan: number;
	inViewRef?: (node?: Element | null) => void;
	onRowClick?: (item: T, index: number) => void;
	handleItemCheck: (checked: CheckedState, item: T) => void;
	selection?: DataTableSelection<T>;
	columns: Column<T>[];
	className?: string;
	highlight?: (item: T) => boolean;
	classNames?: RowClassNames;
};

function DataTableRow<T>({
							 item,
							 index,
							 onRowClick,
							 handleItemCheck,
							 selection,
							 columns,
							 className,
							 highlight,
							 classNames,
						 }: DataTableRowProps<T>) {
	return (
		<TableRow
			onClick={(evt) => {
				evt.stopPropagation();
				onRowClick?.(item, index);
			}}
			className={cn(
				"relative bg-primary-container transition-colors duration-300 ease-in-out hover:bg-background-variant",
				onRowClick && "cursor-pointer",
				className,
				classNames ? classNames[index] : "",
			)}
		>
			{selection && (
				<TableCell className="w-10">
					<Checkbox
						name={`box${index}`}
						tabIndex={-1}
						checked={
							!!selection.items.find((val) => val[selection.key] === item[selection.key])
						}
						onCheckedChange={(checked) => handleItemCheck(checked, item)}
						onClick={(evt) => evt.stopPropagation()}
						disabled={selection.disabled?.(item)}
					/>
				</TableCell>
			)}
			{columns.map(
				(column, indexCell) =>
					!column.hidden && (
						<TableCell
							key={indexCell}
							className={cn(
								column.className?.cell,
							)}
						>
							{column.cell(item, index)}
						</TableCell>
					),
			)}
			{highlight && highlight(item) && (
				<td className="absolute left-0 inset-y-0 bg-on-accent-variant pointer-events-none w-1.5" />
			)}
		</TableRow>
	);
}
