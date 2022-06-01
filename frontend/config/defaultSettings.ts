import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
    title: "NBlog",
    navTheme: "light",
    primaryColor: "#1890ff",
    layout: "side",
    contentWidth: "Fluid",
    fixedHeader: false,
    fixSiderbar: true,
    pwa: false,
    logo: undefined,
    headerHeight: 48,
    splitMenus: false
  };

export default Settings;
