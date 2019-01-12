import moment from 'moment';
import ru from 'moment/locale/ru';
moment.updateLocale('ru', ru);

const makeDateUserFriendly = date => moment(date).format('LLLL');

export default makeDateUserFriendly;