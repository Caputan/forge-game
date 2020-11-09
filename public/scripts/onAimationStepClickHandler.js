let lastStep = null;
let sec = [0.03, 2, 3.5, 8, 26, 28, 31];

function onAnimationStepClickHandler(time, step) {
    if (lastStep) { lastStep.classList.remove('step_active') }
    step.classList.add('step_active');
    lastStep = step;
    animationExt.setTimelineValue(time / animationExt.getDuration());
}