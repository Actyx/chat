export const scrollDomIntoView = (dataAttribute: string) => (
  id: string
): void => {
  document.querySelector(`[${dataAttribute}="${id}"]`)?.scrollIntoView();
  const dom = document.querySelector(`[${dataAttribute}="${id}"]`);
  console.log(dom?.getBoundingClientRect());
};
