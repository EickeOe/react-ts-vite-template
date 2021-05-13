import ReactDOM from 'react-dom';

export function createFuncModal<P>(ModalComponent: any) {
  return (config: {onCancel: (...args: any[]) => void} & P = {} as any) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    // eslint-disable-next-line no-use-before-define
    let currentConfig = {...config, close, visible: true} as any;
    const toPromise = new Promise(() => {});
    function destroy(...args: any[]) {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
      const triggerCancel = args.some(param => param && param.triggerCancel);
      if (config.onCancel && triggerCancel) {
        config.onCancel(...args);
      }
      // for (let i = 0; i < destroyFns.length; i++) {
      //   const fn = destroyFns[i];
      //   // eslint-disable-next-line no-use-before-define
      //   if (fn === close) {
      //     destroyFns.splice(i, 1);
      //     break;
      //   }
      // }
    }

    function render({...props}: any) {
      /**
       * https://github.com/ant-design/ant-design/issues/23623
       * Sync render blocks React event. Let's make this async.
       */
      setTimeout(() => {
        // ReactDOM.createPortal(<ModalComponent {...props} />, div);
        ReactDOM.render(<ModalComponent {...props} />, div);
      });
    }

    function close(...args: any[]) {
      currentConfig = {
        ...currentConfig,
        visible: false,
        afterClose: destroy.bind(null, ...args)
      };
      render(currentConfig);
    }

    function update(newConfig: any) {
      currentConfig = {
        ...currentConfig,
        ...newConfig
      };
      render(currentConfig);
    }

    render(currentConfig);

    //   destroyFns.push(close);

    return {
      destroy: close,
      update,
      toPromise
    };
  };
}
