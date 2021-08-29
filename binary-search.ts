// BINARY SEARCH
function searchBinarily<T>(target: any = 0, set: T[] = [], onCheckMatch = (val) => val === target): T | undefined {
  const setSorted = set.slice().sort(onSort);
  // debug
  console.log(setSorted);
  let passes = 0;
  const onReturn = (val) => {
    if (val === undefined) {
      console.log(`x Could not find \`${target}\` after ${passes} passes`);
    } else {
      console.log(`✓ Found \`${target}\` after ${passes} passes`);
    }
    return val;
  };

  // main algorithm: linear search
  // for (let i = 0; i < setSorted.length; i++) {
  //   passes += 1;
  //   if (setSorted[i] === target) return onReturn(setSorted[i]);
  // };

  // main algorithm: binary search
  const nextIndex = (min, max) => Math.floor((max - min) / 2 + min);
  let limUp = setSorted.length;
  let limDown = 0;
  let currentIndex = nextIndex(limDown, limUp);
  let i = 0;
  while (!onCheckMatch(setSorted[currentIndex]) && limUp - limDown > 1 && i < 50) {
    passes += 1;
    limDown = target < setSorted[currentIndex] ? limDown : currentIndex;
    limUp = target > setSorted[currentIndex] ? limUp : currentIndex;
    currentIndex = nextIndex(limDown, limUp);
    // debug
    console.log(setSorted.slice(limDown, limUp));
    i++;
  }

  return onReturn(onCheckMatch(setSorted[currentIndex]) ? setSorted[currentIndex] : undefined);
}

function test() {
  try {
    const nums = [133, 45, 63, 12, 3, 555, 91, 13, 7, 656];
    expect(searchBinarily(3, nums)).toEqual(3);
    expect(searchBinarily(7, nums)).toEqual(7);
    expect(searchBinarily(12, nums)).toEqual(12);
    expect(searchBinarily(13, nums)).toEqual(13);
    expect(searchBinarily(45, nums)).toEqual(45);
    expect(searchBinarily(63, nums)).toEqual(63);
    expect(searchBinarily(64, nums)).toEqual(undefined);

    const animals = ["goat", "dog", "lion", "octopus", "zebra", "hyena", "crocodile"];
    expect(searchBinarily("goat", animals)).toEqual("goat");
    expect(searchBinarily("dog", animals)).toEqual("dog");
    expect(searchBinarily("lion", animals)).toEqual("lion");
    expect(searchBinarily("octopus", animals)).toEqual("octopus");
    expect(searchBinarily("zebra", animals)).toEqual("zebra");
    expect(searchBinarily("hyena", animals)).toEqual("hyena");
    expect(searchBinarily("cat", animals)).toEqual(undefined);
  } catch (err) {
    console.error(err.message);
  }
}

test();

function onSort(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

function expect(condition, msgOverride = undefined) {
  const onError = (msg) => {
    throw new Error(msgOverride || msg || `Condition failed: ${condition}`);
  };
  return {
    toEqual(target) {
      if (condition === target) return;
      onError(`${condition}<${typeof condition}> does not equal ${target}<${typeof target}>`);
    },
  };
  if (condition) return;
}
