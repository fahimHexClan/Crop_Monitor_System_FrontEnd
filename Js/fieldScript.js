$(document).ready(function () {
    // Sidebar Toggle
    $('#toggleSidebar').click(function () {
        $('#sidebar').toggleClass('collapsed');
        $('#toggleSidebar i').toggleClass('fa-bars fa-times');
        $('#mainContent').toggleClass('collapsed');
    });
    // Manually Trigger the Modal
    $('#openModalButton').click(function () {
        $('#addFieldModal').modal('show');
    });
});