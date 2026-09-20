export const DataTable = ({ headers, minWidth = "min-w-[1000px]", children }) => (
  <table className={`w-full text-sm text-center text-gray-500 ${minWidth}`}>
    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
      <tr>
        {headers.map((header) => (
          <th key={header} scope="col" className="py-3 px-6">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

export const DataRow = ({ children }) => (
  <tr className="transition-all bg-secondary border-gray-700 hover:bg-primary">
    {children}
  </tr>
);

export const DataCell = ({ children, className = "" }) => (
  <td className={`py-4 px-6 font-medium whitespace-nowrap hover:text-white ${className}`}>
    {children}
  </td>
);
