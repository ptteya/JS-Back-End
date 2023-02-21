const Photo = require('../models/Photo');

exports.getAll = () => Photo.find({}).lean();

exports.getOne = (id) => Photo.findById(id).lean();

exports.create = (ownerId, photoData) => Photo.create({ ...photoData, owner: ownerId });

exports.comment = async (photoId, userId, comment) => {
    const photo = await Photo.findById(photoId);

    photo.commentList.push({ userId: userId, comment: comment });
    await photo.save();

    return photo;
}

exports.edit = (photoId, data) => Photo.findByIdAndUpdate(photoId, data, { runValidators: true });

exports.delete = (id) => Photo.findByIdAndDelete(id);

exports.getPhotosByUserId = (userId) => Photo.find({ owner: userId }).lean();
