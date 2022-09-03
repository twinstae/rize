import React from 'react';
import * as tabs from '@zag-js/tabs';
import { useMachine, normalizeProps } from '@zag-js/react';

interface RizeTabsProps<T> {
  data: readonly T[];
  value: (item: T) => string;
  label: (item: T, index: number) => string;
  Content: (props: {index: number}) => JSX.Element;
}

export function RizeTabs<T>({ data, value, label, Content }: RizeTabsProps<T>) {
  console.log('Tabs');
  const [state, send] = useMachine(tabs.machine({ id: 'rize-tabs', value: value(data[0]) }));

  const api = tabs.connect(state, send, normalizeProps);

  return (
    <div {...api.rootProps}>
      <div {...api.triggerGroupProps} className="tabs flex justify-around">
        {data.map((item, index) => (
          <button {...api.getTriggerProps({ value: value(item) })} key={value(item)}

            className={'bg-base-100 tab tab-bordered tab-lg w-1/3 ' + (value(item) === api.value ? 'tab-active' : '')}>
            {label(item, index)}
          </button>
        ))}
      </div>
      {data.map((item, index) => (
        <div {...api.getContentProps({ value: value(item) })} key={value(item)}>
          <Content index={index} />
        </div>
      ))}
    </div>
  );
}
