import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import { Button, Drawer, DrawerProps, Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { isOpenDrawer, setIsOpenDrawer } from 'features/global/globalSlice';

interface DrawerContextProps {
  openDrawer: (title: string,
    content: ReactNode,
    actions?: ReactNode,
    placement?: DrawerProps['placement']) => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextProps>({
  openDrawer: () => { },
  closeDrawer: () => { }
});

export const useDrawer = () => useContext(DrawerContext);

interface DrawerProviderProps {
  children: ReactNode;
}

const DrawerProvider: FC<DrawerProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const isOpenDraer = useAppSelector(isOpenDrawer)
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<ReactNode>(null);
  const [actions, setActions] = useState<ReactNode>(null);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

  const openDrawer = (title: string, content: ReactNode, actions?: ReactNode) => {
    setTitle(title);
    setContent(content);
    setActions(actions);
    setPlacement(placement);
    dispatch(setIsOpenDrawer(true))
  };


  const closeDrawer = () => {
    dispatch(setIsOpenDrawer(false))
    setContent(null);
    setActions(null);
  };

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      {children}
      <Drawer
        title={title}
        placement={placement}
        width={500}
        onClose={closeDrawer}
        open={isOpenDraer}
        extra={
          <Space>
            <Button onClick={closeDrawer}>Cancel</Button>
            {actions}
          </Space>
        }
      >
        {content}
      </Drawer>
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;
