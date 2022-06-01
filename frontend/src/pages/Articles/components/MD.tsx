import 'vditor/dist/index.css';
import React from 'react';
import Vditor from 'vditor';

const MD = () => {
  const [vd, setVd] = React.useState<Vditor>();
  React.useEffect(() => {
    const vditor = new Vditor('vditor', {
      toolbar: [],
      width: '100%',
      minHeight: 600,
      preview: { maxWidth: 1000, theme: { current: 'light' } },
      after: () => {
        vditor.setValue('# 开始撰写你的文章吧!');
        setVd(vditor);
      },
    });
  }, []);
  return <div id="vditor" className="vditor" />;
};

export default MD;
