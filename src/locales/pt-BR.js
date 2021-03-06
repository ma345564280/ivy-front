import analysis from './pt-BR/analysis';
import exception from './pt-BR/exception';
import form from './pt-BR/form';
import globalHeader from './pt-BR/globalHeader';
import login from './pt-BR/login';
import menu from './pt-BR/menu';
import monitor from './pt-BR/monitor';
import result from './pt-BR/result';
import settingDrawer from './pt-BR/settingDrawer';
import settings from './pt-BR/settings';

export default {
  'navBar.lang': 'Idiomas',
  'layout.user.link.help': 'ajuda',
  'layout.user.link.privacy': 'política de privacidade',
  'layout.user.link.terms': 'termos de serviços',
  'app.home.introduce': 'introduzir',
  'app.forms.basic.title': 'Index My Design',
  'app.forms.basic.description':
    'Form pages are used to collect or verify information to users, and basic forms are common in scenarios where there are fewer data items.',
  'web.form.design': 'Upload Your Design',
  'web.form.profile': 'Describe Your Talent',
  ...analysis,
  ...exception,
  ...form,
  ...globalHeader,
  ...login,
  ...menu,
  ...monitor,
  ...result,
  ...settingDrawer,
  ...settings,
};
