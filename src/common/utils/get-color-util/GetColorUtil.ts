const GetColorUtil = (value: number, max:number) => {
  const colorArr = [
    '#adff2f',
    '#b2fa33',
    '#b7f636',
    '#bcf139',
    '#c0ec3b',
    '#c4e73e',
    '#c8e340',
    '#ccde42',
    '#d0d945',
    '#d3d447',
    '#d6cf48',
    '#d9ca4a',
    '#dcc54c',
    '#dfc04d',
    '#e2bb4f',
    '#e4b650',
    '#e7b152',
    '#e9ab53',
    '#eca654',
    '#eea056',
    '#f09b57',
    '#f29558',
    '#f48f59',
    '#f6895a',
    '#f7835b',
    '#f97c5c',
    '#fb755d',
    '#fc6e5d',
    '#fe675e',
    '#ff5f5f',
  ];


  const clampedHours = Math.max(0, Math.min(max, value));
  const index = Math.floor((clampedHours / max) * (colorArr.length - 1));
  return colorArr[index];
};

export default GetColorUtil;
