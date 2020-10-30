export function getTransformStyle(dragging, transformX) {
  return {
    transition: `all ${dragging ? '0ms' : '300ms'} ease 0s`,
    WebkitTransform: `translate3d(${transformX}px, 0px, 0px)`,
    transform: `translate3d(${transformX}px, 0px, 0px)`,
    msTransform: `translate3d(${transformX}px, 0px, 0px)`,
  };
}

export function calculateTransformX(transformX, currentX, startX) {
  return transformX + Math.round(currentX - startX);
}

export function resetPosition(
  slideLength,
  transformX,
  currentIndex,
  slideWidth,
  currentX,
  startX,
  touchThreshold,
) {
  const res = {
    currentIndex,
    transformX,
  };
  const swipeLength = Math.round(currentX - startX);
  const isSwipeLeft = swipeLength > 0;
  if (Math.abs(swipeLength) > slideWidth / touchThreshold) {
    if (isSwipeLeft && currentIndex !== 0) {
      res.currentIndex -= 1;
    } else if (!isSwipeLeft && currentIndex !== slideLength - 1) {
      res.currentIndex += 1;
    }
    res.transformX = res.currentIndex * slideWidth * -1;
  }
  return res;
}
