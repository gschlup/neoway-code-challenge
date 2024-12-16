const startTime = Date.now();
exports.getStatus = async (req, res) => {
  const uptime = Date.now() - startTime;

  // Convert uptime to a more readable format
  const days = Math.floor(uptime / (24 * 60 * 60 * 1000));
  const hours = Math.floor((uptime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((uptime % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((uptime % (60 * 1000)) / 1000);

  const formattedUptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  res.json({
    status: 'ok',
    uptime: formattedUptime,
    requestsCount: global._requestsCount
  });
};