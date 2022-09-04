/** Changes the elements root value when an item in the settings menu is toggled */
export function changeProp(prop: string, val: string): void {
  document.documentElement.style.setProperty(prop, val);
}
