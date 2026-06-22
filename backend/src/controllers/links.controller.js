import linkModel from '../models/link.model.js';
import userModel from '../models/user.model.js';


export const createLink = async (req, res) => {

    const user = req.user;
    const { title, url } = req.body;

    if (!title || !url) {
        return res.status(400).json({
            message: 'Title and URL are required',
        });
    }

    try {
        const newLink = await linkModel.create({
            user: user.id,
            title,
            url,
        });
        return res.status(201).json({
            message: 'Link created successfully',
            link: newLink,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to create link',
        });
    }
}

export const getMyLinks = async (req, res) => {
   console.log("GET MY LINKS HIT");
    const links = await linkModel.find({
    user: req.user.id,


  });

  return res.status(200).json({
    message: "Links retrieved successfully",
    links,
  });
};

export const getLinksByUsername = async (req, res) => {

    const { username } = req.params;

    const user = await userModel.findOne({ username })

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }

    // const links = await linkModel.find({ user: user._id });

    const links = await linkModel.find({
    user: user._id,
    isActive: true,
  });

    return res.status(200).json({
        message: 'Links retrieved successfully',
        links,
    });
}

export const getAnalyticsByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const links = await linkModel.find({ user: user._id }).sort({ clicks: -1 });
        const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
        const topLinks = links.slice(0, 5).map((link) => ({
            title: link.title,
            clicks: link.clicks || 0,
            ctr: totalClicks > 0 ? Number((((link.clicks || 0) / totalClicks) * 100).toFixed(1)) : 0,
        }));
        const dayLabels = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];
        const averageClicksPerDay = Math.round(totalClicks / 7);
        const activity = dayLabels.map((day) => ({
            day,
            clicks: averageClicksPerDay,
            visitors: Math.round(averageClicksPerDay * 0.62),
        }));

        return res.status(200).json({
            message: 'Analytics retrieved successfully',
            analytics: {
                summary: {
                    totalLinks: links.length,
                    totalClicks,
                    uniqueVisitors: Math.round(totalClicks * 0.62),
                    averageClicksPerDay,
                },
                activity,
                topLinks,
                sources: [
                    { name: 'Direct', value: 100 },
                ],
                recentActivity: topLinks.length > 0
                    ? topLinks.map((link) => `${link.title} has ${link.clicks.toLocaleString()} clicks`)
                    : [ 'Create your first link to start collecting analytics' ],
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to retrieve analytics',
        });
    }
}

export const getLinkById = async (req, res) => {
    const { linkId } = req.params;
    const user = req.user;

    try {
        const link = await linkModel.findOne({ _id: linkId, user: user.id });

        if (!link) {
            return res.status(404).json({
                message: 'Link not found',
            });
        }

        return res.status(200).json({
            message: 'Link retrieved successfully',
            link,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to retrieve link',
        });
    }
}

export const updateLink = async (req, res) => {
    const { linkId } = req.params;
    const user = req.user;
    const { title, url, isActive } = req.body;
    const updates = {};

    if (title !== undefined) {
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        updates.title = title;
    }

    if (url !== undefined) {
        if (!url) {
            return res.status(400).json({ message: 'URL is required' });
        }
        updates.url = url;
    }

    if (isActive !== undefined) {
        updates.isActive = Boolean(isActive);
    }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({
            message: 'No updates provided',
        });
    }

    try {
        const link = await linkModel.findOneAndUpdate(
            { _id: linkId, user: user.id },
            updates,
            { new: true, runValidators: true }
        );

        if (!link) {
            return res.status(404).json({
                message: 'Link not found',
            });
        }

        return res.status(200).json({
            message: 'Link updated successfully',
            link,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to update link',
        });
    }
}

export const deleteLink = async (req, res) => {
    const { linkId } = req.params;
    const user = req.user;

    try {
        const link = await linkModel.findOneAndDelete({ _id: linkId, user: user.id });

        if (!link) {
            return res.status(404).json({
                message: 'Link not found',
            });
        }

        return res.status(200).json({
            message: 'Link deleted successfully',
            link,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to delete link',
        });
    }
}

export const incrementLinkClick = async (req, res) =>{
    const { linkId } = req.params;

    const link = await linkModel.findById(linkId)

    if(!link){
        return res.status(404).json({
            message: 'Link not found',
        });
    }

    link.clicks += 1;
    await link.save()

    return res.status(200).json({
        message: 'Link click incremented successfully',
        link,
    });
}

