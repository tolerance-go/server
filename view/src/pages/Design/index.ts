import { withExecutor } from '@/.umi/plugin-executor';
import withAppId from '@/wrappers/withAppId';
import withAuth from '@/wrappers/withAuth';
import Executor from '@@/plugin-executor/routes/design';
import Root from './Root';

export default withAuth(withAppId(withExecutor(Root, Executor)));
