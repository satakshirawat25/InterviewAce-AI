import { Session } from "../models/Session.js";
import { Question } from "../models/Question.js";

export const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;
    const userId = req.user._id ;
   


    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });
     

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );

    session.questions = questionDocs;
    await session.save();
    res.status(201).json({ success: true, session });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// export const getMySessions = async (req, res) => {
//   try {
//     const sessions = await Session.find({ user: req.user._id })
//       .sort({ createdAt: -1 })
//       .populate("questions");
//       console.log("Logged-in user:", req.user);
//     res.status(200).json({ success:true,data: sessions });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

export const getMySessions = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // console.log("Fetching sessions for user:", userId);

    const sessions = await Session.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("questions");

    res.status(200).json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "session not found" });
    }
    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    //check if the logged-in user owns this session
    if (session.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this session" });
    }

    //first delete all questions linked to this session
    await Question.deleteMany({ session: session._id });

    //then delete the session
    await session.deleteOne();

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
