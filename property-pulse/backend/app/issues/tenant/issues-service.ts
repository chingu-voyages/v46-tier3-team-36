import { PrismaClient, Issue, Notification } from '@prisma/client';
import { BadRequestError } from '../../../middleware/errorMiddleware';
import notificationsService from '../../notifications/notifications-service';

const prisma = new PrismaClient();

const createIssue = async (user, issue:Issue) => {
	const {type, unitId=null, title, description} = issue;
	const createdIssue = await prisma.issue.create({
		data: {
			type,
			tenantId: user.id,
			unitId,
			title,
			description
		}
	})
	console.log(createdIssue)

	  // TODO: fix
  // might have to associate issues with the landlord too for inquiries
  if (unitId === null) {
    return;
  }

	// find landlord to create notification
	const landlord = await prisma.user.findFirst({
		include: {
			properties: {
				include: {
					units: true
				}
			},
		},
		where: {
			properties: {
				some: {
					units: {
						some: {
							id: unitId
						}
					}
				}
			}
		}
	})

	if (!landlord)
    throw new BadRequestError("Must specify landlord");

	const newNotification: Partial<Notification> = {
    title: `New ${type === 'maintenanceRequest' ? "maintenance request" 
                                                : "complaint"} from ${user.name}`,
    content: `Link to issue: ${createdIssue.id}
              ${description.slice(0, 20)}...`,
    userId: landlord.id
  }
	
  const newNotificationTest = await notificationsService.createNotification(user, newNotification as Notification)
	console.log(newNotificationTest)
	return createdIssue;
}

const getAllIssues = async (user) => {
	return await prisma.issue.findMany({
		where:{tenantId:user.id}
	})
}

const updateIssue = async (issueId:number, data:Issue) =>{
	const {type, title, description} = data;

	const updatedIssue = await prisma.issue.update({
		where:{
			id: issueId
		},
		data:{
			type,
			title,
			description
		}
	})

	return updatedIssue;
}

const deleteIssue = async (issueId: number) => {
	const deletedIssue = await prisma.issue.delete({
		where:{
			id:issueId
		}
	})
	return deletedIssue;
}

export default {createIssue, getAllIssues, updateIssue, deleteIssue};