import "../pages/Shared/shared.css";
import "./RbacTable.css";

/**
 * @typedef {{ id: string, header: string, accessor?: string, render?: (row: object) => React.ReactNode }} RbacTableColumn
 */

/**
 * @param {object} props
 * @param {RbacTableColumn[]} props.columns
 * @param {object[]} props.data
 * @param {(row: object) => string | number} [props.getRowKey]
 * @param {boolean} [props.isLoading]
 * @param {string} [props.emptyMessage]
 * @param {string} [props.loadingMessage]
 * @param {string} [props.wrapperClassName]
 */
function RbacTable({
  columns,
  data = [],
  getRowKey = (row) => row.id,
  isLoading = false,
  emptyMessage = "No data",
  loadingMessage = "Loading...",
  wrapperClassName = "",
}) {
  const colCount = columns.length;
  const wrapClass = wrapperClassName
    ? `rbac-table-wrap ${wrapperClassName}`
    : "rbac-table-wrap";

  const renderCell = (row, column) => {
    if (typeof column.render === "function") {
      return column.render(row);
    }
    const key = column.accessor ?? column.id;
    const value = row[key];
    return value != null ? String(value) : "";
  };

  return (
    <div className={wrapClass}>
      <table className="rbac-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.id}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr className="rbac-table__row rbac-table__row--banner">
              <td colSpan={colCount} className="rbac-table__banner rbac-table__banner--loading">
                <span className="rbac-table__banner-inner">{loadingMessage}</span>
              </td>
            </tr>
          ) : !data.length ? (
            <tr className="rbac-table__row rbac-table__row--banner">
              <td colSpan={colCount} className="rbac-table__banner rbac-table__banner--empty">
                <span className="rbac-table__banner-inner">{emptyMessage}</span>
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={getRowKey(row)} className="rbac-table__row">
                {columns.map((col) => (
                  <td key={col.id}>{renderCell(row, col)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RbacTable;
