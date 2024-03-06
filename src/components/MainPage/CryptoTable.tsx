// CryptoTable.tsx
import React from "react";

type TableRowData = {
  id: number;
  pair: {
    currency1: JSX.Element;
    currency2: JSX.Element;
    text: string;
  };
  price: number;
  tvl: number;
  change: string;
};

const TableRow = ({ data }: { data: TableRowData }) => (
  <tr>
    <td className="text-center text-xs font-normal text-neutral-50">
      {data.id}
    </td>
    <td className="text-center flex items-center justify-center">
      <div className="flex gap-1 mr-2">
        {data.pair.currency1}
        {data.pair.currency2}
      </div>
      <div className="text-xs font-normal text-neutral-50">
        {data.pair.text}
      </div>
    </td>
    <td className="text-center text-xs font-normal text-neutral-50">
      {data.price}
    </td>
    <td className="text-center text-xs font-normal text-neutral-50">
      {data.tvl}
    </td>
    <td
      className={`text-center text-xs font-normal ${
        data.change.startsWith("-") ? "text-red-500" : "text-green-500"
      }`}
    >
      {data.change}
    </td>
  </tr>
);

const CryptoTable = ({ data }: { data: TableRowData[] }) => (
  <table className="table-auto border border-neutral-800 rounded-xl">
    <thead>
      <tr>
        <th className="text-center">#</th>
        <th className="text-center">Пара</th>
        <th className="text-center">Цена</th>
        <th className="text-center">TVL</th>
        <th className="text-center">Изменения</th>
      </tr>
    </thead>
    <tbody>
      {data.map((rowData) => (
        <TableRow key={rowData.id} data={rowData} />
      ))}
    </tbody>
  </table>
);

export default CryptoTable;
