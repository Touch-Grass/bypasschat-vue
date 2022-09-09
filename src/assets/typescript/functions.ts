export function hideDropdown(e: Event): void {
  if (
    e.target === document.querySelector(".user_wrapper") ||
    e.target === document.querySelector(".profile_image") ||
    e.target === document.querySelector(".profile_name")
  )
    return;
  (document.querySelector(".dropdown_area") as HTMLElement).style.display =
    "none";
  //TODO: Add this ref
  //   dropdownOpen = false;
  console.log(e);
}

document.querySelector(`*`)!.addEventListener("click", hideDropdown);
