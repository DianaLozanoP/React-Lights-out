import { render, fireEvent } from '@testing-library/react'
import Board from "./Board"

//smoke test
test("it renders without crashing", () => {
    render(<Board />)
})

//snapshot test
// test('should match snapshot', () => {
//     const { asFragment } = render(<Board nrows={4} ncols={4} chanceLightStartsOn={0.5} />)
//     expect(asFragment()).toMatchSnapshot();
// })

test("display board", () => {
    const { container, getByText } = render(<Board nrows={4} ncols={4} chanceLightStartsOn={0.5} />)
    const h1 = getByText('Lights Out Game')
    const table = container.querySelector(".Board")
    expect(h1).toBeInTheDocument();
    expect(table).toBeInTheDocument();

})