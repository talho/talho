class Talho::UsersController < Clearance::UsersController

  def new
    @user = User.new
    @user[:talho_jurisdiction_id] = nil
    @user[:role_id] = nil
    @jurisdictions = Jurisdiction.all.sort_by{|j| j.name}
  end

  def create
    jurisdiction = params[:user]["talho_jurisdiction_id"].blank? ? nil : Jurisdiction.find(params[:user]["talho_jurisdiction_id"])
    params[:user].delete("talho_jurisdiction_id")
    talho_role        = Role.find_by_id_and_application(params[:user]["role_id"], 'talho')
    public_talho_role = Role.find_by_name_and_application("Dashboard", "talho")
    @user             = User.new params[:user]
    @user.email       = @user.email.downcase
    @user.role_memberships.build(:role=>public_talho_role, :jurisdiction=>jurisdiction, :user=>@user)

    respond_to do |format|
      if @user.save
        @role_request              = RoleRequest.new()
        @role_request.requester    = @user
        @role_request.user         = @user
        @role_request.role         = talho_role
        @role_request.jurisdiction = jurisdiction
        if @role_request.save
          RoleRequestMailer.deliver_user_notification_of_role_request @role_request
        end
        SignupMailer.deliver_confirmation(@user)
        format.html { redirect_to sign_in_path }
        format.xml  { render :xml => @user, :status => :created, :location => @user }
        flash[:notice] = "Thanks for signing up! An email will be sent to #{@user.email} shortly to confirm your account." +
          "Once you've confirmed you'll be able to login into the TALHO Dashboard.\n\nIf you have any questions please email support@#{DOMAIN}."
      else
        @user[:talho_jurisdiction_id] = jurisdiction.blank? ? nil : jurisdiction.id
        @user[:role_id] = talho_role.blank? ? nil : talho_role.id
        @selected_role = talho_role.blank? ? nil : talho_role
        @jurisdictions = Jurisdiction.all.sort_by{|j| j.name}
        format.html { render :action => "new" }
        format.xml  { render :xml => @user.errors, :status => :unprocessable_entity }
      end
    end
  end
end