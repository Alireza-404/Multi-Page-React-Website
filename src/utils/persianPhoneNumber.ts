export const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length > 6) {
    return digits.replace(/(\d{3})(\d{3})(\d{0,4})/, "$1\u00A0$2\u00A0$3");
  }

  if (digits.length > 3) {
    return digits.replace(/(\d{3})(\d{0,3})/, "$1\u00A0$2");
  }

  return digits;
};
