const Session = require('../models/Session');
const Company = require('../models/Company');

// @desc        Get all sessions
// @route       GET /sessions
// @access      Public
exports.getSessions = async (req, res, next) => {
  let query;
  // General users can see only their Sessions!
  if (req.user.role !== 'admin') {
    query = Session.find({ user: req.user.id }).populate({
      path: 'Company',
      select: 'name website tel',
    });
  }
  // If you are an admin, you can see all!
  else {
    if (req.params.companyId) {
      console.log(req.params.companyId);
      query = Session.find({ company: req.params.companyId }).populate({
        path: 'Company',
        select: 'name website tel',
      });
    } else {
      query = Session.find().populate({
        path: 'Company',
        select: 'name website tel',
      });
    }
  }
  try {
    const sessions = await query;

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Cannot find session',
    });
  }
};

// @desc        Get single session
// @route       GET /sessions/:id
// @access      Public
exports.getSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id).populate({
      path: 'Company',
      select: 'name website tel',
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: `No session with the id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Cannot find session',
    });
  }
};

// @desc        Add session
// @route       POST /sessions
// @access      Private
exports.addSession = async (req, res, next) => {
  try {
    req.body.company = req.params.companyId;

    const company = await Company.findById(req.params.companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: `No company with the id of ${req.params.companyId}`,
      });
    }

    // Add user id to req.body
    req.body.user = req.user.id;

    // Check for existed session
    const existedSessions = await Session.find({ user: req.user.id });

    // If the user is not an admin, they can only create 3 session.
    if (existedSessions.length >= 3 && req.user.role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${req.user.id} has already made 3 sessions`,
      });
    }

    const session = await Session.create(req.body);

    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Cannot create session',
    });
  }
};

// @desc        Update session
// @route       PUT /sessions/:id
// @access      Private
exports.updateSession = async (req, res, next) => {
  try {
    let session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: `No session with the id of ${req.params.id}`,
      });
    }

    //Make sure user is the session owner
    if (session.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this session`,
      });
    }

    session = await Session.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Cannot update session',
    });
  }
};

// @desc        Delete session
// @route       DELETE /sessions/:id
// @access      Private
exports.deleteSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: `No session with the id of ${req.params.id}`,
      });
    }

    //Make sure user is the session owner
    if (session.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this session`,
      });
    }

    await session.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Cannot delete session',
    });
  }
};
