-- =============================================
-- Author: Min Kim 
-- Create date: Oct 24, 2022
-- Description: Get Clients using Join with Appointments table with users table.
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================


alter proc dbo.Clients_Select_ByVetProfileId
				@Id int
				,@PageIndex int
				,@PageSize int
as
/*
execute dbo.Clients_Select_ByVetProfileId
						4
						,0
						,10
*/
BEGIN
	DECLARE @Offset INT = @PageIndex * @PageSize;

	SELECT
		A.ClientId
		,A.AppointmentStart
		,A.Notes
		,A.StatusTypeId
		,st.[Name] AS StatusTypeName
		,apt.[Id] AS AppointmentTypeId
		,apt.[Name] AS AppointmentTypeId
		,l.[Id] AS LocatoinId
		,l.[LineOne]
		,l.[LineTwo]
		,l.[City]
		,l.[Zip]
		,l.[Longitude]
		,l.[Latitude]
		,lt.[Id] AS LocationTypeId
		,lt.[Name] AS LocationTypeName		
		,s.[Id] AS StateId
		,s.[Name] AS StateName
		,u.AvatarUrl
		,u.FirstName
		,u.LastName
		,u.Email
		,Horses = (SELECT HP.[Name], hp.Age, hp.PrimaryImageUrl
					FROM dbo.HorseProfiles AS HP
					INNER JOIN dbo.UserHorses AS UH
						ON	uh.UserId = u.Id
						WHERE uh.UserId = U.Id
						FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
		,TotalCount = COUNT(1) OVER()
	
	from dbo.Appointments AS A
	INNER JOIN dbo.Users AS U
		on U.Id = A.ClientId
	INNER JOIN dbo.StatusTypes AS st
		ON a.StatusTypeId = st.Id
	INNER JOIN dbo.AppointmentTypes AS apt
		ON a.AppointmentTypeId = apt.Id
	INNER JOIN dbo.Locations AS l
		ON A.LocationId = L.Id
	INNER JOIN dbo.States AS s
		ON l.StateId = s.Id
	INNER JOIN dbo.LocationTypes AS lt
		ON l.LocationTypeId = lt.Id
	WHERE A.VetProfileId = @Id
	ORDER BY A.AppointmentStart
	OFFSET @Offset ROWS
	FETCH NEXT @PageSize ROWS ONLY


end
