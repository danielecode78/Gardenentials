export function descendingComparator(a, b, orderBy) {
  let A, B;

  if (orderBy === "plantedAt") {
    A = a.history?.plantedAt ?? null;
    B = b.history?.plantedAt ?? null;

    const timeA = A ? new Date(A).getTime() : -Infinity;
    const timeB = B ? new Date(B).getTime() : -Infinity;

    if (timeB < timeA) return -1;
    if (timeB > timeA) return 1;
    return 0;
  }

  A = a[orderBy];
  B = b[orderBy];
  if (B < A) return -1;
  if (B > A) return 1;
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
