export const DataTable = ({ caption, headers, children }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[640px] text-left text-sm">
      <caption className="sr-only">{caption}</caption>
      <thead className="border-b border-line bg-slate-50 text-xs uppercase tracking-wide text-muted">
        <tr>
          {headers.map((header) => (
            <th key={header} scope="col" className="px-4 py-3 font-semibold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-line">{children}</tbody>
    </table>
  </div>
);

export const DataRow = ({ children }) => (
  <tr className="transition-colors hover:bg-slate-50">{children}</tr>
);

export const DataCell = ({ children, className = "" }) => (
  <td className={`whitespace-nowrap px-4 py-3 align-middle ${className}`}>{children}</td>
);
