import styled from "styled-components";

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TableWrapper = styled.div`
  padding: 20px;
  overflow-x: auto;
`;

export const TableCell = styled.td`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.text};
`;

export const TableCellMedal = styled(TableCell)`
  text-align: center;
`;

export const TableHeader = styled.th`
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.text};
  color: white;
  padding: 8px 0;
`;

export const TableHeaderMedal = styled(TableHeader)`
  width: 80px;
  font-size: 24px;
  white-space: nowrap;
  cursor: pointer;
`;

export const TableCellRemove = styled(TableCellMedal)`
  width: 40px;
  cursor: pointer;
`;

export const TableHeaderRemove = styled(TableHeader)`
  width: 40px;
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #eee;
  }
`;
