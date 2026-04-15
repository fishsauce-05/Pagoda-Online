/**
 * Query responses for fortune telling at Chua Ha
 */

const fortuneQueries = [
  {
    question: "Bao giờ có người yêu?",
    answers: [
      "Người yêu của bạn sẽ xuất hiện trong vòng 3-6 tháng tới. Hãy mở lòng đón nhận.",
      "Duyên phận sẽ tìm đến bạn khi bạn không mong chờ. Sống thật với bản thân là chìa khóa.",
      "Tình yêu đang rất gần, nhưng trước tiên hãy yêu thương chính mình hơn.",
      "Năm nay là năm may mắn với tình duyên. Tự tin và nở mũi lên khi gặp người phù hợp.",
      "Người ấy đã ở gần bạn, chỉ cần bạn nhận ra và tỏ tình.",
      "Kiên nhẫn chờ đợi, người có duyên với bạn sẽ đến khi thời gian tới.",
      "Hãy tham gia các hoạt động xã hội, tình yêu sẽ tìm đến bạn qua những cuộc gặp gỡ tự nhiên.",
      "Bạn sẽ gặp được người thương trong vòng 1-2 năm, phụ thuộc vào cách bạn hành động hôm nay."
    ]
  },
  {
    question: "Phát triển điểm gì ở bản thân để có người yêu?",
    answers: [
      "Phát triển thêm sự tự tin và yêu thương bản thân. Người khác sẽ phải yêu bạn trước tiên.",
      "Hãy biết lắng nghe và thấu hiểu người khác. Đó là yếu tố quan trọng nhất.",
      "Bạn cần cải thiện kỹ năng giao tiếp và mở lòng với những trải nghiệm mới.",
      "Hãy rèn luyện bản thân trở nên độc lập, tự tin. Sự mạnh mẽ này sẽ hấp dẫn đối phương.",
      "Phát triển những đam mê riêng của bạn. Người tích cực và có mục đích dễ thu hút tình yêu.",
      "Bạn cần học cách bỏ qua những thất bại trong quá khứ và bắt đầu lại với tâm thế tươi mới.",
      "Cải thiện sụ hiểu biết về cuộc sống, đọc sách, học hỏi những điều mới. Trí tuệ là hấp lực đích thực.",
      "Hãy học cách quản lý cảm xúc tốt hơn. Sự ổn định cảm xúc sẽ giúp bạn là một đối tác tuyệt vời."
    ]
  },
  {
    question: "Có ế tới hết đời không?",
    answers: [
      "Không, điều đó không nhất định. Bạn vẫn có rất nhiều cơ hội trong cuộc đời.",
      "Quẻ báo bạn sẽ gặp được tình yêu nếu bạn chủ động tìm kiếm.",
      "Số phận không bao giờ đóng cửa hoàn toàn. Hãy giữ hy vọng và nỗ lực.",
      "Bạn thú hấp dẫn nhiều hơn bạn nghĩ. Hãy để người khác nhìn thấy điểm tốt đó.",
      "Tuổi tác không phải là vấn đề. Tình yêu có thể đến bất cứ lúc nào nếu bạn sẵn sàng.",
      "Ế không phải là sự kiện cố định. Bạn vẫn còn rất nhiều thời gian và cơ hội.",
      "Phương pháp bạn tìm kiếm tình yêu cần thay đổi. Hãy thử những cách tiếp cận mới.",
      "Quẻ nói rằng bạn sẽ tìm được tình yêu. Hãy tin vào điều đó và hành động theo."
    ]
  }
];

/**
 * Get random response for a question
 */
function getRandomResponse(questionIndex) {
  const answers = fortuneQueries[questionIndex].answers;
  return answers[Math.floor(Math.random() * answers.length)];
}
