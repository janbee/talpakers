import { FC } from 'react';

interface NotFoundProps {}

const NotFoundComponent: FC<NotFoundProps> = () => <div data-testid="NotFound">NotFound Component</div>;
NotFoundComponent.displayName = 'NotFound';
export default NotFoundComponent;
