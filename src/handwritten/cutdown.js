const setTimeCutDown = (seconds, onTick, onComplete) => {
  const startTime = performance.now();
  const endTime = startTime + seconds * 1000;
  let expTime = startTime + 1000;

  const tick = () => {
    const now = performance.now();
    const remainTime = endTime - now;
    if (remainTime > 0) {
      onTick(Math.ceil(remainTime / 1000));
      const drift = now - (expTime - 1000);
      const delay = Math.max(0, 1000 - drift);
      expTime += 1000;
      setTimeout(tick, delay);
    } else {
      onTick(0);
      onComplete();
    }
  };
  tick();
};

const rAFCutDown = (seconds, onTick, onComplete) => {
  const startTime = performance.now();
  const endTime = startTime + seconds * 1000;
  let lastSecond = Math.ceil((endTime - startTime) / 1000);

  const frameLoop = () => {
    const remainTime = endTime - performance.now();
    if (remainTime > 0) {
      const currentSecond = Math.ceil(remainTime / 1000);
      if (currentSecond !== lastSecond) {
        lastSecond = currentSecond;
        onTick(currentSecond);
      }
      requestAnimationFrame(frameLoop);
    } else {
      onTick(0);
      onComplete();
    }
  };
  frameLoop();
};
