import withAppId from '@/wrappers/withAppId';
import withAuth from '@/wrappers/withAuth';
import Root from './Root';

export default withAuth(withAppId(Root));
