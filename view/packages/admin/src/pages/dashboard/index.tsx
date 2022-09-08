import { PageContainer } from '@ant-design/pro-components';
// import { useModel } from '@umijs/max';
import CoreIndicator from './CoreIndicator';
import styles from './index.less';

export default () => {
  // const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        {/* <Guide name={trim(name)} /> */}
        <CoreIndicator />
      </div>
    </PageContainer>
  );
};
