import { render, fireEvent } from '@testing-library/react'
import Cell from "./Cell"

//smoke test
test("it renders without crashing", () => {
    render(<Cell key={[0, 1]}
        isLit={false}
        flipCellsAroundMe={() => flipCellsAround('0' - '1')} />)
})

//snapshot test
test('should match snapshot', () => {
    const { asFragment } = render(<Cell key={[0, 1]}
        isLit={false}
        flipCellsAroundMe={() => flipCellsAround('0' - '1')} />)
    expect(asFragment()).toMatchSnapshot();
})

test("display cell", () => {
    const { container } = render(<Cell key={[0, 1]}
        isLit={false}
        flipCellsAroundMe={() => flipCellsAround('0' - '1')} />)
    const nonLitCell = container.querySelector('.Cell')
    const litCell = container.querySelector('.Cell-lit')
    expect(nonLitCell).toBeInTheDocument();
    expect(litCell).not.toBeInTheDocument();

})