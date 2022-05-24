export function generateHeader(image: string, headerName: string, style: any): any {
  const headerStack = [];
  headerStack.push([
    {
      columns: [
        {image, width: 35, height: 35},
        {text: headerName, margin: [7, 0, 0, 0], style}
      ],
      margin: [0, 57, 0, 0]
    },
    {
      canvas: [
        {type: 'line', x1: 41, y1: -12, x2: 280, y2: -12, lineWidth: 1, lineColor: 'blue'}
      ]
    }
  ]);

  return headerStack;
}
