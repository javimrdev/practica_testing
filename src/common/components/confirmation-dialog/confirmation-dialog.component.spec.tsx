import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';


describe('ConfirmationDialogComponent tests', () => {
  it('dialog is open', () => {
    //arrange
    const props = {
      isOpen: true,
      onAccept: () => false,
      onClose: () => false,
      title: 'TITLE',
      labels: {
        closeButton: 'closeButtonText',
        acceptButton: 'acceptButtonText',
      },
    };
    
    //act
    render(
      <ConfirmationDialogComponent
        isOpen={props.isOpen}
        onAccept={props.onAccept}
        onClose={props.onClose}
        title={props.title}
        labels={props.labels}
      />
    );

    const title = screen.getByText('TITLE');
    const closeButton = screen.getByText(props.labels.closeButton)
    const acceptButton = screen.getByText(props.labels.acceptButton)

    //assert
    expect(title).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(acceptButton).toBeInTheDocument();
  });

  it('dialog is close', () => {
    //arrange
    const props = {
      isOpen: false,
      onAccept: () => false,
      onClose: () => false,
      title: 'TITLE',
      labels: {
        closeButton: 'closeButtonText',
        acceptButton: 'acceptButtonText',
      },
    };
    
    //act
    render(
      <ConfirmationDialogComponent
        isOpen={props.isOpen}
        onAccept={props.onAccept}
        onClose={props.onClose}
        title={props.title}
        labels={props.labels}
      />
    );

    const dialog = screen.queryAllByRole('presentation');

    //assert
    expect(dialog).toHaveLength(0);
  });

  it('button close event hide the dialog', () => {
    //arrange
    const props = {
      isOpen: true,
      onAccept: () => false,
      onClose: jest.fn(),
      title: 'TITLE',
      labels: {
        closeButton: 'closeButtonText',
        acceptButton: 'acceptButtonText',
      },
    };
    
    //act
    render(
      <ConfirmationDialogComponent {...props} />
    );

    
    const button = screen.getByRole('button', {
      name: props.labels.closeButton
    });
    fireEvent(button, 
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),)

      //assert
    expect(props.onClose).toHaveBeenCalled();
  });
});

