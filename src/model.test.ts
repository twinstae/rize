import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { createModel } from '@xstate/test';
import { createMachine } from 'xstate';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TOGGLE: 'active'
      },
      meta: {
        test: () => waitFor(() => screen.getByText('off'))
      }
    },
    active: {
      on: {
        TOGGLE: 'inactive'
      },
      meta: {
        test: () => waitFor(() => screen.getByText('on'))
      }
    }
  }
});


const toggleModel = createModel(toggleMachine).withEvents({
  TOGGLE: {
    exec: () => userEvent.click(screen.getByRole('button')),
  }
});

function init(){
  document.body.innerHTML = '';

  let state = false;
  const button = document.createElement('button');
  function render(state: boolean){
    button.innerHTML = state ? 'on' : 'off';
  }
  button.onclick = () => {
    state = !state;
    render(state);
  };
  render(state);

  document.body.appendChild(button);
}

describe('toggle', () => {
  const testPlans = toggleModel.getSimplePathPlans();

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(path.description, async () => {
          
          init();

          await path.test(null);
        });
      });
    });
  });

  it('should have full coverage', () => {
    return toggleModel.testCoverage();
  });
});