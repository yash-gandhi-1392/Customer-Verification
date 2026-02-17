export const isResidentialAddress = (address: string) => {
  return (
    address.toLowerCase().includes("apt") ||
    address.toLowerCase().includes("unit") ||
    address.toLowerCase().includes("residential")
  );
};
