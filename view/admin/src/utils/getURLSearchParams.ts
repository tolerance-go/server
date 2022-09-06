export default () => {
  return new URL(document.location.href).searchParams;
};
