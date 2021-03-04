export const scrollDomIntoView = (dataAttribute: string) => (
  id: string
): void => {
  document.querySelector(`[${dataAttribute}="${id}"]`)?.scrollIntoView();
};
