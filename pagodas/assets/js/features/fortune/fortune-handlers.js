import { PATHS } from '../../core/config/paths.js';
import { FLAGS } from '../../core/config/flags.js';
import { emit } from '../../core/events/event-bus.js';
import { EVENTS } from '../../core/events/event-types.js';
import { hideModalById, showModalById } from '../../shared/modals/modal-adapter.js';
import { showReactionImage } from '../../shared/modals/modal-img.js';
import { activityState } from '../../core/state/activity-state.js';
import { fortuneQueries } from '../../core/data/fortune.data.js';
import { isAllowedFortuneIndex, createFortuneResult } from './fortune-logic.js';
import { resetFortuneQuestionSelection, renderFortuneQuestionOptions, renderFortuneQuestionSelection, renderFortuneQrModal, renderFortuneResultModal } from './fortune-render.js';

export function createFortuneHandlers() {
  function openFortuneModal() {
    activityState.update({ selectedFortuneQuestion: null });
    renderFortuneQuestionOptions(FLAGS.fortuneAllowedIndexes, fortuneQueries);
    resetFortuneQuestionSelection();
    showModalById('fortuneModal');
  }

  function closeFortuneModal() {
    hideModalById('fortuneModal');
    resetFortuneQuestionSelection();
  }

  function selectFortuneQuestion(index) {
    if (!isAllowedFortuneIndex(index)) {
      return;
    }

    activityState.update({ selectedFortuneQuestion: index });
    renderFortuneQuestionSelection(index);
    emit(EVENTS.FORTUNE_QUESTION_SELECTED, { index });
  }

  function proceedFortunePayment() {
    const selectedFortuneQuestion = activityState.getState().selectedFortuneQuestion;

    if (!isAllowedFortuneIndex(selectedFortuneQuestion)) {
      window.alert('Vui lòng chọn 1 trong 3 câu hỏi');
      return;
    }

    hideModalById('fortuneModal');
    renderFortuneQrModal();
  }

  function completeFortunePayment() {
    const selectedFortuneQuestion = activityState.getState().selectedFortuneQuestion;
    const result = createFortuneResult(selectedFortuneQuestion, fortuneQueries);

    hideModalById('fortuneQRModal');
    emit(EVENTS.FORTUNE_PAYMENT_COMPLETED, {
      index: selectedFortuneQuestion,
      question: result.question
    });
    renderFortuneResultModal(result);
  }

  function cancelFortune() {
    closeFortuneModal();
    showReactionImage(PATHS.reactionSad);
  }

  return {
    openFortuneModal,
    selectFortuneQuestion,
    proceedFortunePayment,
    completeFortunePayment,
    closeFortuneModal,
    cancelFortune,
  };
}
