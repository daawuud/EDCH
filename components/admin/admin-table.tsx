type TableRow = Record<string, string>;

export function AdminTable({
  columns,
  rows,
  showActions = true
}: {
  columns: string[];
  rows: TableRow[];
  showActions?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-edch-sky text-edch-ink dark:bg-slate-950 dark:text-white">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-5 py-4 font-black">
                  {column}
                </th>
              ))}
              {showActions ? <th className="px-5 py-4 font-black">Actions</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100 dark:divide-white/10">
            {rows.map((row, index) => (
              <tr key={`${Object.values(row).join("-")}-${index}`}>
                {columns.map((column) => (
                  <td key={column} className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-200">
                    {row[column.toLowerCase().replaceAll(" ", "")] ?? row[column] ?? "-"}
                  </td>
                ))}
                {showActions ? (
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="rounded-full bg-edch-blue px-3 py-2 text-xs font-black text-white">
                        Edit
                      </button>
                      <button className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-700">
                        Delete
                      </button>
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
