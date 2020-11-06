import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

function useResizeObserver() {
  const [observerEntry, setObserverEntry] = useState({});
  const [node, setNode] = useState(null);
  const observer = useRef(null);

  const disconnect = useCallback(() => {
    if (observer.current) observer.current.disconnect();
  }, []);

  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => setObserverEntry(entry));
    if (node) observer.current.observe(node);
  }, [node]);

  useLayoutEffect(() => {
    observe();
    return () => disconnect();
  }, [disconnect, observe]);

  return [setNode, observerEntry];
}

export default useResizeObserver;
