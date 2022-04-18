import { render, screen } from '@testing-library/react';
import DeleteProduct from '../DeleteProduct';


describe("Test cases for the delete component", ()=> {

    it('should check if the propmt has the right message', async() => {
        render(<DeleteProduct />)

        const deletePrompt = screen.getAllByTestId("prompt")
        expect(deletePrompt.textContent).toBe("Are you sure you want to delete?")
    });

})