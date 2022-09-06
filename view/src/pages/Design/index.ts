import withAppId from '@/wrappers/withAppId';
import withAuth from '@/wrappers/withAuth';
import withExecutor from '@/wrappers/withExecutor';
import Executor from '@@/plugin-executor/routes/design';
import Root from './Root';

export default withAuth(withAppId(withExecutor(Root, Executor)));
