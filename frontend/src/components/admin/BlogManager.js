// Update BlogManager.js
const BlogManager = () => {
    const { logActivity } = useActivityLogger();
   
    const deleteBlog = async (id) => {
      await deleteDoc(doc(db, 'blogs', id));
      await logActivity('DELETE_BLOG', `Deleted blog post ID: ${id}`);
    };
   
    const togglePublish = async (blog) => {
      const newStatus = !blog.isPublished;
      await updateDoc(doc(db, 'blogs', blog.id), { isPublished: newStatus });
      await logActivity('TOGGLE_BLOG_STATUS', 
        `${newStatus ? 'Published' : 'Unpublished'} blog: ${blog.title}`
      );
    };
   };
   
   // Update Settings.js
   const Settings = () => {
    const { logActivity } = useActivityLogger();
   
    const saveSettings = async () => {
      await updateDoc(doc(db, 'settings', 'general'), settings);
      await logActivity('UPDATE_SETTINGS', 'Updated site settings');
    };
   };
   
   // Update DealCard.js
   const DealCard = ({ deal }) => {
    const { logActivity } = useActivityLogger();
   
    const handleDealClick = async () => {
      await logActivity('DEAL_CLICK', `Clicked deal: ${deal.title}`);
      window.open(deal.storeUrl, '_blank');
    };
   };