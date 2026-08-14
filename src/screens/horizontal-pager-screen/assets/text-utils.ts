export function getFullName(firstName: string, lastName: string | undefined) {
  return `${firstName} ${lastName ?? ""}`;
}

export function getInitials(firstName: string, lastName: string | undefined) {
  if (lastName) {
    return `${firstName[0].toUpperCase()}${lastName[0].toLowerCase()}`;
  } else {
    return `${firstName[0].toUpperCase()}${firstName[1].toLowerCase()}`;
  }
}

export function formatPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
}
