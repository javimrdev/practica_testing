import { useConfirmationDialog } from "./confirmation-dialog.hook";
import { renderHook, act } from '@testing-library/react-hooks';
import { createEmptyLookup, Lookup } from 'common/models';


describe('useConfirmationDialog tests', () => {
    it('dialog is not opened by default', () => {
        //arrange

        //act
        const {result} = renderHook(() => useConfirmationDialog());

        //assert
        expect(result.current.isOpen).toBe(false);
        expect(result.current.onClose).toEqual(expect.any(Function));
    })

    it('Opening the dialog', () => {
        //arrange
        const emptyLookup = createEmptyLookup();
        //act
        const {result} = renderHook(() => useConfirmationDialog());

        act(() => {
            result.current.onOpenDialog(emptyLookup);

        })

        //assert
        expect(result.current.isOpen).toBe(true);
        expect(result.current.itemToDelete).toBe(emptyLookup);
    })

    it('Opening and closing the dialog', () => {
        //arrange
        const emptyLookup = createEmptyLookup();
        //act
        const {result} = renderHook(() => useConfirmationDialog());

        act(() => {
            result.current.onOpenDialog(emptyLookup);
            result.current.onClose();
        })

        //assert
        expect(result.current.isOpen).toBe(false);
    })

    it('Dialog data is correct when dialog is opened', () => {
        //arrange
        const noEmptyLookup = {
            id: '1',
            name: 'Charly',
          };

        //act
        const {result} = renderHook(() => useConfirmationDialog());

        act(() => {
            result.current.onOpenDialog(noEmptyLookup);
        })

        //assert
        expect(result.current.itemToDelete.id).toEqual(noEmptyLookup.id);
        expect(result.current.itemToDelete.name).toEqual(noEmptyLookup.name);

    })

    it('Dialog data is empty after be closed', () => {
        //arrange
        const noEmptyLookup = {
            id: '1',
            name: 'Charly',
          };

          const emptyLookup = createEmptyLookup();

        //act
        const {result} = renderHook(() => useConfirmationDialog());

        act(() => {
            result.current.onOpenDialog(noEmptyLookup);
            result.current.onAccept();
        })
        

        //assert
        expect(result.current.itemToDelete).toEqual(emptyLookup);
    })
});